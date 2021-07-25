import { MODELS } from ".";

const RelationshipGenerator = () => {
  MODELS.USER.hasMany(MODELS.USER_ROLE, { as: "user_roles" });
  MODELS.USER_ROLE.belongsTo(MODELS.USER, {
    foreignKey: "userId",
    as: "user",
  });

  MODELS.ROLE.hasMany(MODELS.USER_ROLE, { as: "role_user_roles" });
  MODELS.USER_ROLE.belongsTo(MODELS.ROLE, { foreignKey: "roleId", as: "role" });

  //song has many parts
  MODELS.SONG.hasMany(MODELS.PART, { as: "part" });
  MODELS.PART.belongsTo(MODELS.SONG, {
    foreignKey: "songId",
    as: "song",
  });
};

export { RelationshipGenerator };
