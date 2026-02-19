import { z } from "zod";

//auth users

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegisterForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;

// auth forgot password

export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ConfirmToken = Pick<Auth, "token">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordFormAuth = Pick<
  Auth,
  "password" | "password_confirmation"
>;

export type UpdateUserCurrentPassword = Pick<
  Auth,
  "current_password" | "password" | "password_confirmation"
>;

export type CheckPassword = Pick<Auth, "password">;

//user

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;

// notes
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

// tasks

export const taskStatusSchema = z.enum([
  "pending",
  "on_hold",
  "in_progress",
  "under_review",
  "completed",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>;

//proyects
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: userSchema.pick({
    _id: true,
  }),
  tasks: z.array(taskProjectSchema),
  // El backend manda team sin poblar: array de strings (ObjectIds)
  team: z.array(z.string()),
});

export const dashboardProyectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "description" | "projectName"
>;

// team members

export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
export const TeamMembersSchema = z.array(teamMemberSchema);