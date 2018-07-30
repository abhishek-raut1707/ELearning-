import { Panel } from './panel';

export class Comics {
    title: string;
    plan: Plan[] = [];
    panel_data = [];
    active_flag: boolean;
}

export class Plan {
    name: string;
}
