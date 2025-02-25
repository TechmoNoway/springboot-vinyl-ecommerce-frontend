export const hanldeCheckAuth = () => {
  //  const decodedToken: DecodedToken =
  //           jwtDecode<DecodedToken>(token);
  //         console.log(decodedToken.exp);
  //         console.log(decodedToken.sub);
  //         const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  //         console.log(currentUnixTimestamp);
  //         if (
  //           decodedToken.exp &&
  //           decodedToken.exp > currentUnixTimestamp
  //         ) {
  //           const userdetailResponse = await getCurrentUser(
  //             parseInt(decodedToken.sub as string)
  //           );
  //           if (userdetailResponse?.data.data) {
  //             const currentUserInfo = userdetailResponse.data.data;
  //             localStorage.setItem(
  //               "info",
  //               JSON.stringify(currentUserInfo.id)
  //             );
  //             dispatch(setUser(currentUserInfo));
  //             setCurrentUser(currentUserInfo);
  //           }
};
