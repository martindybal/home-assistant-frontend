import type { LovelaceBadgeConfig } from "../../../data/lovelace/config/badge";
import type { LovelaceCardConfig } from "../../../data/lovelace/config/card";
import type { LovelaceSectionRawConfig } from "../../../data/lovelace/config/section";
import { isStrategySection } from "../../../data/lovelace/config/section";
import type { LovelaceConfig } from "../../../data/lovelace/config/types";
import type { LovelaceViewRawConfig } from "../../../data/lovelace/config/view";
import { isStrategyView } from "../../../data/lovelace/config/view";

export type LovelaceCardPath = [number, number] | [number, number, number];
export type LovelaceContainerPath = [number] | [number, number];

export const parseLovelaceCardPath = (
  path: LovelaceCardPath
): { viewIndex: number; sectionIndex?: number; cardIndex: number } => {
  if (path.length === 2) {
    return {
      viewIndex: path[0],
      cardIndex: path[1],
    };
  }
  return {
    viewIndex: path[0],
    sectionIndex: path[1],
    cardIndex: path[2],
  };
};

export const parseLovelaceContainerPath = (
  path: LovelaceContainerPath
): { viewIndex: number; sectionIndex?: number } => {
  if (path.length === 1) {
    return {
      viewIndex: path[0],
    };
  }
  return {
    viewIndex: path[0],
    sectionIndex: path[1],
  };
};

export const getLovelaceContainerPath = (
  path: LovelaceCardPath
): LovelaceContainerPath => path.slice(0, -1) as LovelaceContainerPath;

type FindLovelaceContainer = {
  (config: LovelaceConfig, path: [number]): LovelaceViewRawConfig;
  (config: LovelaceConfig, path: [number, number]): LovelaceSectionRawConfig;
  (
    config: LovelaceConfig,
    path: LovelaceContainerPath
  ): LovelaceViewRawConfig | LovelaceSectionRawConfig;
};
export const findLovelaceContainer: FindLovelaceContainer = (
  config: LovelaceConfig,
  path: LovelaceContainerPath
): LovelaceViewRawConfig | LovelaceSectionRawConfig => {
  const { viewIndex, sectionIndex } = parseLovelaceContainerPath(path);

  const view = config.views[viewIndex];

  if (!view) {
    throw new Error("View does not exist");
  }
  if (sectionIndex === undefined) {
    return view;
  }
  if (isStrategyView(view)) {
    throw new Error("Can not find section in a strategy view");
  }

  const section = view.sections?.[sectionIndex];

  if (!section) {
    throw new Error("Section does not exist");
  }
  return section;
};

export const updateLovelaceContainer = (
  config: LovelaceConfig,
  path: LovelaceContainerPath,
  containerConfig: LovelaceViewRawConfig | LovelaceSectionRawConfig
): LovelaceConfig => {
  const { viewIndex, sectionIndex } = parseLovelaceContainerPath(path);

  let updated = false;
  const newViews = config.views.map((view, vIndex) => {
    if (vIndex !== viewIndex) return view;

    if (sectionIndex === undefined) {
      updated = true;
      return containerConfig;
    }

    if (isStrategyView(view)) {
      throw new Error("Can not update section in a strategy view");
    }

    if (view.sections === undefined) {
      throw new Error("Section does not exist");
    }

    const newSections = view.sections.map((section, sIndex) => {
      if (sIndex !== sectionIndex) return section;
      updated = true;
      return containerConfig;
    });
    return {
      ...view,
      sections: newSections,
    };
  });

  if (!updated) {
    throw new Error("Can not update cards in a non-existing view/section");
  }
  return {
    ...config,
    views: newViews,
  };
};

type LovelaceItemKeys = {
  cards: LovelaceCardConfig[];
  badges: (Partial<LovelaceBadgeConfig> | string)[];
};

export const updateLovelaceItems = <T extends keyof LovelaceItemKeys>(
  key: T,
  config: LovelaceConfig,
  path: LovelaceContainerPath,
  items: LovelaceItemKeys[T]
): LovelaceConfig => {
  const { viewIndex, sectionIndex } = parseLovelaceContainerPath(path);

  let updated = false;
  const newViews = config.views.map((view, vIndex) => {
    if (vIndex !== viewIndex) return view;
    if (isStrategyView(view)) {
      throw new Error(`Can not update ${key} in a strategy view`);
    }
    if (sectionIndex === undefined) {
      updated = true;
      return {
        ...view,
        [key]: items,
      };
    }

    if (view.sections === undefined) {
      throw new Error("Section does not exist");
    }

    const newSections = view.sections.map((section, sIndex) => {
      if (sIndex !== sectionIndex) return section;
      if (isStrategySection(section)) {
        throw new Error(`Can not update ${key} in a strategy section`);
      }
      updated = true;
      return {
        ...section,
        [key]: items,
      };
    });
    return {
      ...view,
      sections: newSections,
    };
  });

  if (!updated) {
    throw new Error(`Can not update ${key} in a non-existing view/section`);
  }
  return {
    ...config,
    views: newViews,
  };
};

export const findLovelaceItems = <T extends keyof LovelaceItemKeys>(
  key: T,
  config: LovelaceConfig,
  path: LovelaceContainerPath
): LovelaceItemKeys[T] | undefined => {
  const { viewIndex, sectionIndex } = parseLovelaceContainerPath(path);

  const view = config.views[viewIndex];

  if (!view) {
    throw new Error("View does not exist");
  }
  if (isStrategyView(view)) {
    throw new Error("Can not find cards in a strategy view");
  }
  if (sectionIndex === undefined) {
    return view[key] as LovelaceItemKeys[T] | undefined;
  }

  const section = view.sections?.[sectionIndex];

  if (!section) {
    throw new Error("Section does not exist");
  }
  if (isStrategySection(section)) {
    throw new Error("Can not find cards in a strategy section");
  }
  if (key === "cards") {
    return section[key as "cards"] as LovelaceItemKeys[T] | undefined;
  }
  throw new Error(`${key} is not supported in section`);
};
