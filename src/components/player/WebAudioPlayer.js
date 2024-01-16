export default class WebAudioPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sources = [];
        this.isPlaying = false;
    }

    stop() {
        this.sources.forEach(source => {
            if (source) {
                source.stop();
                source.disconnect();
            }
        });
        this.sources = [];
        this.isPlaying = false;
    }

    load(arg) {
        return new Promise((resolve, reject) => {
            const audioPromises = arg.map(({ audioPath }) => this.loadAudioFile(audioPath));

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

    createBufferSources(audioBuffers, arg) {
        const sources = [];
        const startTime = this.audioContext.currentTime;

        audioBuffers.forEach((buffer, index) => {
            const { startingTime, volume ,ghost } = arg[index];
            console.log("createBufferSources",{ startingTime, volume ,ghost })

            // Create a source node from the buffer
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;

            // Create a gain node to control the volume
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = (volume || 1)*(ghost?0.5:1); // Default to 1 if volume is not provided

            // Connect the source to the gain node and then to the destination
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Schedule the start based on the current time
            source.start(startTime + startingTime);

            source.onended = () => {
                this.handleSourceEnded(source);
            };

            sources.push(source);
        });

        return sources;
    }


    handleSourceEnded(source) {
        source.disconnect();
        const index = this.sources.indexOf(source);
        if (index !== -1) {
            this.sources.splice(index, 1);
        }
        if (this.sources.length === 0 && this.isPlaying) {
            this.onAllSourcesEnded();
        }
    }

    play() {
        return new Promise((resolve, reject) => {
            if (this.sources.length === 0) {
                reject(new Error('No audio loaded. Please call the load() function first.'));
                return;
            }

            this.isPlaying = true;
            // We assume sources are already scheduled to start at the right time
            // so no need to call start() on them again here

            // Wait for all sources to end
            const intervalCheck = setInterval(() => {
                if (this.sources.length === 0) {
                    clearInterval(intervalCheck);
                    resolve();
                }
            }, 100);
        });
    }

    onAllSourcesEnded() {
        console.log("All sources have ended");
        // Override this method in subclasses or assign a function to it at runtime to respond to all sources ending.
    }
}