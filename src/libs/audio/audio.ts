import {AudioSingleton} from "./audioSingleton";

export class AudioMain {
  private audio = AudioSingleton.getInstance().getAudio();

  public set src(src: string) {
    this.audio.src = src;
  }
  public play() {
    this.audio.play().then();
  }
  public pause() {
    this.audio.pause();
  }

  public toggleAudio() {
    if (this.audio.paused) {
      this.play();
    } else this.pause();
  }
  public getCurrentTime() {
    return this.audio.currentTime;
  }
  public setCurrentTime(time: number) {
    this.audio.currentTime = time;
  }

  public getAudioDetail(): HTMLAudioElement {
    return this.audio;
  }
}
