export interface Config {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: {
    length: string;
    accumulated_precipitation: string;
    mass: string;
    pressure: string;
    temperature: string;
    volume: string;
    wind_speed: string;
  };
  location_name: string;
  time_zone: string;
  components: string[];
  config_dir: string;
  whitelist_external_dirs: string[];
  allowlist_external_dirs: string[];
  allowlist_external_urls: string[];
  version: string;
  config_source: string;
  recovery_mode: boolean;
  state: string;
  external_url: string;
  internal_url: string;
  currency: string;
  country: string;
  language: string;
  safe_mode: boolean;
}
