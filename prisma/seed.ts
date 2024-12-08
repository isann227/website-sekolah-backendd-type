import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {

const saltOrRounds = 10;
const password = 'admin1996';

  const admin = await prisma.users.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      username: 'admin',
      phone: '81904597978',
      email_verified_at: new Date(),
      phone_verified_at: new Date(), 
      password : await bcrypt.hash(password, saltOrRounds),
      alamat : "Indramayu",
      status : "ACTIVE",
      role : "admin",
      active_date : new Date(),
      created_at : new Date(),
      updated_at : new Date(),
    },
  })

  console.log({ admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })