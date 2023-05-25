import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  /* @OneToOne(() => Role)
  @JoinColumn()
  role: Roles; */

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
