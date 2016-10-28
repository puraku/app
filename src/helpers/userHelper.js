export function avatarURL(user) {
  if (!user) {
    return 'http://www.plurk.com/static/default_medium.gif';
  }

  const { has_profile_image, avatar, id } = user;
  if (has_profile_image == 1 && !avatar) {
    return `http://avatars.plurk.com/${id}-medium.gif`;
  } else if (has_profile_image == 1 && avatar) {
    return `http://avatars.plurk.com/${id}-medium${avatar}.gif`;
  } else {
    return 'http://www.plurk.com/static/default_medium.gif';
  }
}
