export class AudioSingleton {
  private static instance: AudioSingleton;
  private constructor() {}

  public static getInstance(): AudioSingleton {
    if (!AudioSingleton.instance) {
      const element = document.createElement("audio");
      element.setAttribute("id", "audio_player");
      element.setAttribute("aria-hidden", "true");
      document.querySelector("body")?.append(element);

      AudioSingleton.instance = new AudioSingleton();
    }

    return AudioSingleton.instance;
  }

  public getAudio(): HTMLAudioElement {
    return document.getElementById("audio_player") as HTMLAudioElement;
  }
}
