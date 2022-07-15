import User from "../models/User";
import LoggedInUser from "../models/LoggedInUser";

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
      user = await User.create({
        name: given_name,
        nickname: given_name,
        image_url,
        email,
      });
    }

    // if (!user) {
    //   const name = given_name.split("[")[0];
    //   const rest = given_name.split("[")[1].replace("]", "");
    //   const [goToSchool, department] = rest.split("/");

    //   user = await User.create({
    //     name,
    //     nickname: name,
    //     image_url,
    //     email,
    //     department: department.trim(),
    //     goToSchool: goToSchool.trim(),
    //   });
    // }

    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

export const googleLoginFinish = async (req, res) => {
  // 모든 유저
  // await LoggedInUser.create({ user: req.user });
  // setTimeout(async () => {
  //   await LoggedInUser.findOneAndDelete({ user: req.session.user }); // 하루 뒤 로그아웃
  // }, 24 * 60 * 60 * 1000);

  // 개인
  req.session.user = req.user;
  req.session.loggedIn = true;

  return res.redirect("http://localhost:3000/login/success");
};

/********************************
          구글 로그아웃
********************************/
export const logout = async (req, res) => {
  // 모든 유저
  // await LoggedInUser.findOneAndDelete({ user: req.session.user });
  // console.log("logout");

  // 개인
  req.session.destroy();
  console.log("hi");

  return res.json({ status: 200 });
};

/********************************
        유저 정보 가져오기
********************************/
export const authUser = async (req, res) => {
  if (req.session.user)
    return res.json({ status: 200, user: req.session.user });
  else return res.json({ status: 400 });
};

/********************************
      로그인 상태인지 확인
********************************/
export const isLoggedIn = async (req, res) => {
  if (req.session.user) return res.sendStatus(200);
  else return res.sendStatus(400);
};

/********************************
      로그인한 유저 리스트
********************************/
export const loggedInUserLists = () => {};

/********************************
      유저가 웹을 닫은 경우
********************************/
export const webClosed = async (req, _) => {
  try {
    const {
      body: { userId },
    } = req;

    const user = await User.findById(userId);
    console.log("close");
    await LoggedInUser.findOneAndDelete({ user });
  } catch (error) {
    console.log(error);
  }
};

/********************************
      유저가 웹을 연 경우
********************************/
export const webOpen = async (req, _) => {
  try {
    const {
      body: { userId },
    } = req;

    const user = await User.findById(userId);
    console.log("open");
    await LoggedInUser.create({ user });
  } catch (error) {
    console.log(error);
  }
};
