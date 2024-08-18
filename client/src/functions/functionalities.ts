export function checkAccess(un:unknown) {
  if (un == "shafayat") {
    return true;
  } else if (un == "guest") {
    return true;
  } else {
    return false;
  }
}

