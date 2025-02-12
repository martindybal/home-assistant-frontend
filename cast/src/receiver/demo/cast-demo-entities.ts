import type { Entity } from "../../../../src/fake_data/entity";
import { convertEntities } from "../../../../src/fake_data/entity";

export const castDemoEntities: () => Entity[] = () =>
  convertEntities({
    "light.reading_light": {
      entity_id: "light.reading_light",
      state: "on",
      attributes: {
        friendly_name: "Reading Light",
      },
    },
    "light.ceiling": {
      entity_id: "light.ceiling",
      state: "on",
      attributes: {
        friendly_name: "Ceiling lights",
      },
    },
    "light.standing_lamp": {
      entity_id: "light.standing_lamp",
      state: "off",
      attributes: {
        friendly_name: "Standing Lamp",
      },
    },
    "sensor.temperature_inside": {
      entity_id: "sensor.temperature_inside",
      state: "22.7",
      attributes: {
        battery_level: 78,
        unit_of_measurement: "\u00b0C",
        friendly_name: "Inside",
        device_class: "temperature",
      },
    },
    "sensor.temperature_outside": {
      entity_id: "sensor.temperature_outside",
      state: "31.4",
      attributes: {
        battery_level: 53,
        unit_of_measurement: "\u00b0C",
        friendly_name: "Outside",
        device_class: "temperature",
      },
    },
    "person.arsaboo": {
      entity_id: "person.arsaboo",
      state: "not_home",
      attributes: {
        radius: 50,
        friendly_name: "Arsaboo",
        latitude: 52.3579946,
        longitude: 4.8664597,
        entity_picture: "/images/arsaboo.jpg",
      },
    },
    "person.melody": {
      entity_id: "person.melody",
      state: "not_home",
      attributes: {
        radius: 50,
        friendly_name: "Melody",
        latitude: 52.3408927,
        longitude: 4.8711073,
        entity_picture: "/images/melody.jpg",
      },
    },
    "zone.home": {
      entity_id: "zone.home",
      state: "zoning",
      attributes: {
        hidden: true,
        latitude: 52.3631339,
        longitude: 4.8903147,
        radius: 100,
        friendly_name: "Home",
        icon: "hass:home",
      },
    },
    "input_number.harmonyvolume": {
      entity_id: "input_number.harmonyvolume",
      state: "18.0",
      attributes: {
        initial: 30,
        min: 1,
        max: 100,
        step: 1,
        mode: "slider",
        friendly_name: "Volume",
        icon: "hass:volume-high",
      },
    },
    "climate.upstairs": {
      entity_id: "climate.upstairs",
      state: "auto",
      attributes: {
        current_temperature: 24,
        min_temp: 15,
        max_temp: 30,
        temperature: null,
        target_temp_high: 26,
        target_temp_low: 18,
        fan_mode: "auto",
        fan_modes: ["auto", "on"],
        hvac_modes: ["auto", "cool", "heat", "off"],
        aux_heat: "off",
        actual_humidity: 30,
        fan: "on",
        operation: "fan",
        fan_min_on_time: 10,
        friendly_name: "Upstairs",
        supported_features: 27,
        preset_mode: "away",
        preset_modes: ["home", "away", "eco", "sleep"],
      },
    },
    "climate.downstairs": {
      entity_id: "climate.downstairs",
      state: "auto",
      attributes: {
        current_temperature: 22,
        min_temp: 15,
        max_temp: 30,
        temperature: null,
        target_temp_high: 24,
        target_temp_low: 20,
        fan_mode: "auto",
        fan_modes: ["auto", "on"],
        hvac_modes: ["auto", "cool", "heat", "off"],
        aux_heat: "off",
        actual_humidity: 30,
        fan: "on",
        operation: "fan",
        fan_min_on_time: 10,
        friendly_name: "Downstairs",
        supported_features: 27,
        preset_mode: "home",
        preset_modes: ["home", "away", "eco", "sleep"],
      },
    },
  });
