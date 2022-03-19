
print('Start #################################################################');

db = db.getSiblingDB('nestjs_dev');
db.createUser(
  {
    user: 'dev',
    pwd: 'login123',
    roles: [{ role: 'readWrite', db: 'nestjs_dev' }],
  },
);


db = db.getSiblingDB('nestjs_prod');
db.createUser(
  {
    user: 'prod',
    pwd: 'login123',
    roles: [{ role: 'readWrite', db: 'nestjs_prod' }],
  },
);





print('END #################################################################');
