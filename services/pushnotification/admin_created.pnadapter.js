const AdminCreatedPNAdapter = (logger) => {
  const push = async (data) => {
    console.log("sending push notification");
  };

  return { push };
};

export { AdminCreatedPNAdapter };
