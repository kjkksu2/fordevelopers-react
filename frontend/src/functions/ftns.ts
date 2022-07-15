import { IUser } from "../recoil/auth";

export const userData = (user: IUser) => {
  return {
    choice: user?.choice ?? [],
    comment: user?.comment ?? [],
    dev: user?.dev ?? [],
    created_at: user?.created_at ?? "",
    department: user?.department ?? "",
    email: user?.email ?? "",
    github_url: user?.github_url ?? "",
    goToSchool: user?.goToSchool ?? "",
    image_url: user?.image_url ?? "",
    introduction: user?.introduction ?? "",
    heart: user?.heart ?? 0,
    heart_clicked_user: user?.heart_clicked_user ?? [],
    name: user?.name ?? "",
    nickname: user?.nickname ?? "",
    visit: user?.visit ?? 0,
    _id: user?._id ?? "",
  };
};
