import { Howl } from 'howler'

export default class Sound {

    constructor() {
        this.matchedSound = this.initSound('matchedSound', [
            'atom:///assets/sound/matched.mp3'
        ])

        this.availableSound = this.initSound('availableSound', [
            'atom:///assets/sound/available.mp3'
        ])
    }

    initSound(name, src) {
        return new Howl({
            src    : src,
            preload: true,
            html5  : true,
            volume : 1,

            onload() {
                console.log(`[SoundHelper] ${name} onload`)
            },

            onplay(id) {
                console.log(`[SoundHelper] ${name} onplay (id: ${id})`)
            },

            onend() {
                console.log(`[SoundHelper] ${name} onend`)
            },

            onloaderror(id, code) {
                console.log(`[SoundHelper] ${name} onloaderror (id: ${id}, code: ${code})`)
            }
        })
    }

    playMatchedSound() {
        this.matchedSound.play()
    }

    playAvailableSound() {
        this.availableSound.play()
    }

}
