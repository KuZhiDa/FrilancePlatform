import { Model } from 'sequelize-typescript';
import type { Male } from '../../common/constant/male.type';
import type { Education } from 'src/common/constant/education.type';
interface dataPortfolio {
    id_user: number;
    age?: number;
    male?: Male;
    education?: Education;
    countryFrom?: string;
    cityFrom?: string;
    infoAboutYourself?: string;
}
export declare class ProfilesExecutor extends Model<ProfilesExecutor, dataPortfolio> {
    id_user: number;
    age: number;
    male: Male;
    education: Education;
    countryFrom: string;
    cityFrom: string;
    infoAboutYourself: string;
}
export {};
