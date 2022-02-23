import User from "../models/User";

/********************************
          구글 로그인
********************************/
export const googleCallback = async (_, __, profile, done) => {
  try {
    const {
      _json: { given_name, picture: image_url, email },
    } = profile;

    let user = await User.findOne({ email });

    if (!user) {
      const name = given_name.split("[")[0];
      const rest = given_name.split("[")[1].replace("]", "");
      const [goToSchool, department] = rest.split("/");

      user = await User.create({
        name,
        nickname: name,
        image_url,
        email,
        department: department.trim(),
        goToSchool: goToSchool.trim(),
      });
    }

    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

export const googleLoginFinish = (req, res) => {
  req.session.user = req.user;
  req.session.loggedIn = true;

  return res.redirect("http://localhost:3000/");
};

/********************************
        로그인 했는지 확인
********************************/
export const authUser = (req, res) => {
  const user = req.session.user ?? null;
  return res.json(user);
};
