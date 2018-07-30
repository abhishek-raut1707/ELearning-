export class Panel {
    serial_no: number;
    image: String;
    img_url: string;
    alt: string;
    title: string;
    exp_data?: ExpData[] = [];
    description: string;
}

export class ExpData {
    expstring: string;
    ExpID: string;
    ContentID: string;
}
