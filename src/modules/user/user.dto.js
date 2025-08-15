export function createUserDTO(kakaoProfile) {
  return {
    email: kakaoProfile._json.kakao_account.email,
    nickname: kakaoProfile.displayName || kakaoProfile.username,
    profileImage: kakaoProfile._json.properties?.profile_image,
    password: '', // 소셜 로그인은 비번 없이 처리
  };
}
