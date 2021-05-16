import { MODELS } from ".";

const RelationshipGenerator = () => {
  MODELS.USER.hasMany(MODELS.USER_ROLE, { as: "user_roles" });
  MODELS.USER_ROLE.belongsTo(MODELS.USER, {
    foreignKey: "userId",
    as: "user",
  });

  MODELS.ROLE.hasMany(MODELS.USER_ROLE, { as: "role_user_roles" });
  MODELS.USER_ROLE.belongsTo(MODELS.ROLE, { foreignKey: "roleId", as: "role" });
};

export { RelationshipGenerator };
