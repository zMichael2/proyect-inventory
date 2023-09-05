import { Model } from "sequelize";

interface VerificationAttributes {
  verification_id?: number;
  verification_code: string | null;
  isactivate: boolean;
  isactivatechange: boolean;
}

class Verification
  extends Model<VerificationAttributes>
  implements VerificationAttributes
{
  public verification_id!: number;
  public verification_code!: string | null;
  public isactivate!: boolean;
  public isactivatechange!: boolean;
}

interface CheckCode {
  email: string;
  code: string;
}

interface VerificateCode extends CheckCode {
  password: string;
}

export { Verification, CheckCode, VerificateCode };
