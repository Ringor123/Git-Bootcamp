export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseDescripton extends CoursePartBase {
  description: string,
}

export interface CoursePartBasic extends CoursePartBaseDescripton {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBaseDescripton {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBaseDescripton {
  requirements: string[],
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;