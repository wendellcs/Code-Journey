export type Student = {
    id: string
    first_name: string
    last_name: string
    current_module: string
    tag: string | null
    age: number
    class_id: string
    created_at: string
}

export type StudentBasicData = {
    id: string
    student_name: string
}

export type StudentIndependenceLevel = {
    independence_level: 0 | 1 | 2 | 3 | 4 | 5
}

export type StudentSkill = {
    id: string
    student_id: string
    technology_id: string 
    independence_level: StudentIndependenceLevel
    notes: string | null 
    name: string 
    tech_icon: string
    created_at: string
}