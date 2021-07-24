import { Role } from "./role.model";
import { Song } from "./song.model";
import { User } from "./user.model";
import { UserRole } from "./user_role.model";

const ModelInitialization = (sequelize, Sequelize) => {
  //auth models
  const user = User(sequelize, Sequelize);
  const role = Role(sequelize, Sequelize);
  const user_role = UserRole(sequelize, Sequelize, user, role);

  //song models
  const song = Song(sequelize, Sequelize);

  return {
    user,
    role,
    user_role,
    song
  };
};

export { ModelInitialization };
