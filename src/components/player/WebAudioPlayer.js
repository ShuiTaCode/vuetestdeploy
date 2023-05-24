export default class WebAudioPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sources = [];
    }

    stop() {
        this.sources.forEach(source => {
            source.stop();
            source.disconnect();
        });
        this.sources = [];
    }

    load(arg) {
        return new Promise((resolve, reject) => {
            const audioPromises = arg.map(({ audioPath }) => {
                return this.loadAudioFile(audioPath);
            });

            Promise.all(audioPromises)
                .then(audioBuffers => {
                    this.sources = this.createBufferSources(audioBuffers, arg);
                    resolve();
                })
                .catch(error => {
                    console.error('Error loading audio files:', error);
                    reject(error);
                });
        });
    }

    loadAudioFile(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            request.onload = () => {
                this.audioContext.decodeAudioData(request.response, resolve, reject);
            };

            request.onerror = reject;

            request.send();
        });
    }

    onAllSourcesEnded() {
        console.log("ONALLSOURCES ENDED");
        // Override this method in subclasses or assign a function to it at runtime to respond to all sources ending.
    }


    createBufferSources(audioBuffers, arg) {
        const sources = [];
        audioBuffers.forEach((buffer, index) => {
            const { startingTime } = arg[index];
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start(this.audioContext.currentTime + startingTime);

            source.onended = () => {
                source.disconnect();
                const index = this.sources.indexOf(source);
                if (index !== -1) {
                    this.sources.splice(index, 1);
                }
            };

            setTimeout(() => {
                source.stop();
            }, (startingTime + buffer.duration) * 1000);

            sources.push(source);
        });

        return sources;
    }






    play() {
        return new Promise((resolve, reject) => {
            if (this.sources.length === 0) {
                reject(new Error('No audio loaded. Please call the load() function first.'));
                return;
            }

            const checkPlaybackState = () => {
                if (this.sources.length === 0) {
                    console.log('this sound is ending naturally')
                    resolve();
                }
            };

            this.sources.forEach(source => {
                source.onended = checkPlaybackState;
                source.start();
            });
        });
    }


}
