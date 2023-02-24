import {ApplicationConfig} from "@/ApplicationConfig";


const instruments ={}

instruments[ApplicationConfig.drums.HIHAT] = {audio: new Audio("sounds/hihat.mp3"), path: "sounds/hihat.mp3",volume:0.1};
instruments[ApplicationConfig.drums.SNDRM] = {audio: new Audio("sounds/snare.mp3"), path: "sounds/snare.mp3",volume:0.2};
instruments[ApplicationConfig.drums.BSDRM] = {audio: new Audio("sounds/bassdrum.mp3"), path: "sounds/bassdrum.mp3",volume:0.2};
instruments[ApplicationConfig.drums.HITOM] = {audio: new Audio("sounds/hitom.mp3"), path: "sounds/hitom.mp3",volume:0.1};
instruments[ApplicationConfig.drums.MDTOM] = {audio: new Audio("sounds/mdtom.mp3"), path: "sounds/mdtom.mp3",volume:0.1};
instruments[ApplicationConfig.drums.LWTOM] = {audio: new Audio("sounds/lwtom.mp3"), path: "sounds/lwtom.mp3",volume:0.1};
instruments[ApplicationConfig.drums.RDCYB] = {audio: new Audio("sounds/ride.mp3"), path: "sounds/ride.mp3",volume:1.0};
instruments[ApplicationConfig.drums.CSCYB] = {audio: new Audio("sounds/crash.mp3"), path: "sounds/crash.mp3",volume:0.1};








export const PlayerConfiguration = {

instruments

}