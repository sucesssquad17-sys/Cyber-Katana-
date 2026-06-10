class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneOsc = null;
    this.droneLFO = null;
    this.droneGain = null;
    this.isMuted = true;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    
    // Create master out
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0; // start muted
    this.masterGain.connect(this.ctx.destination);

    this.initialized = true;
  }

  async tryUnlock() {
    if (!this.initialized) await this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        return false;
      }
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.setMute(false);
      return true;
    }
    return false;
  }

  setMute(mute) {
    this.isMuted = mute;
    if (!this.initialized || !this.ctx) return;
    
    if (mute) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    } else {
      // Fade in to full allowed volume
      this.masterGain.gain.setTargetAtTime(1.0, this.ctx.currentTime, 2.0);
    }
  }

  setScrollProgress(progress) {
    if (!this.initialized || this.isMuted) return;
    // Drone pitch shift removed
  }

  // --- SCROLL EFFECTS ---

  // Soft katana unsheath "shing"
  playShing() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3000, this.ctx.currentTime + 0.3);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    // Highpass filter for metallic thinness
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1);
  }

  // Elegant sword whoosh
  playWhoosh() {
    if (!this.initialized || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
    filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // Subtle neon energy pulse
  playPulse() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  // Clean resheath click
  playResheath() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Metallic blade glide
  playBladeGlide() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1400, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1);
  }

  // Deep cinematic impact
  playImpact() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  // --- UI SOUNDS ---

  // Low glass tap (hover)
  playGlassTap() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, this.ctx.currentTime);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Tiny digital beep (click)
  playBeep() {
    if (!this.initialized || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.setValueAtTime(0, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
}

export const audio = new AudioEngine();
