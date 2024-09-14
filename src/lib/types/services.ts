/**
 * @alpha
 */
export interface Service {
  name: string;
  description: string;
  fields: ServiceFields;
  target?: { entity?: EntityTarget[]; device?: DeviceTarget[] };
  Response: unknown;
}

interface NumberSelector {
  number: {
    mode?: string;
    min: number;
    max: number;
    step: number;
    unit_of_measurement?: string;
  };
}

interface SelectSelector {
  options: string[];
  translation_key?: string;
}

interface TextSelector {
  text: null;
}

interface BooleanSelector {
  boolean: null;
}

interface DeviceTarget {
  filter: {
    integration: string;
  };
}

interface DeviceSelector {
  device: DeviceTarget;
}

interface EntityTarget {
  integration: string;
  domain: string | string[];
  supported_feature: string[];
}

interface EntitySelector {
  entity: EntityTarget;
}

interface TemplateSelector {
  template: null;
}

interface ObjectSelector {
  object: null;
}

interface TimeSelector {
  time: null;
}

interface ServiceField {
  name: string;
  default?: string | boolean;
  description?: string;
  required?: boolean;
  advanced?: boolean;
  selector?:
    | NumberSelector
    | SelectSelector
    | TextSelector
    | BooleanSelector
    | DeviceSelector
    | TemplateSelector
    | ObjectSelector
    | TimeSelector
    | EntitySelector;
}

type ServiceFields = Record<string, ServiceField>;
