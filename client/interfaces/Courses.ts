export interface CourseInterface {
  name: string;

  preReqsCatogoryA: preReq[];

  preReqsCatogoryB: preReq[];

  credits: string[];

  gradeReq: number;

  prestige: number;

  semester: string;

  courseTier: string;
}

export interface preReq {
  name: string;

  concurrent: boolean;
}
