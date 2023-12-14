export class AudioSingleton {
  private static instance: Record<string, HTMLAudioElement> = {};
  private constructor() {}

  public static getInstance(id: string): any {
    if (!AudioSingleton.instance[id]) {
      let audio = new Audio();
      AudioSingleton.instance[id] = audio;
    }
    return AudioSingleton.instance[id];
  }

  public static pauseAllAudioExcept(id: string): any {
    Object.entries(this.instance).map(([key, value]) => {
      if (key !== id) {
        value.pause();
      }
    });
  }
}
