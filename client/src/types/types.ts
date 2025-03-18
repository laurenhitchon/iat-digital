
export interface Module {
	title: string;
	lessons: [];
}

export interface Course {
	modules: Module[];
	id: string;
	slug: string;
	title: string;
	description: string;
	longDescription: string;
	hours: number;
	instructor: string;
	category: string;
	image: string;
}