var DBConfig = {
  HOST: "vocalavenue.cgum9yn2jezz.us-east-2.rds.amazonaws.com",
  USER: "va_admin",
  PASSWORD: "VA#M0ra#SL#1",
  DB: "va_db_dev",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export { DBConfig };
