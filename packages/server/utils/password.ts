import argon2 from "argon2";

// Hashage de mdp
// abcdefg -> 21$fg564df56g4d5sfg4d5sfg4dsfg7fdoipgdfgohdf_çè'"ç_(rijherkjher)k => HASHAGE
export const hashPassword = async (
  password: string
): Promise<string | void> => {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 1,
    });

    console.info("Mot de passe hashé: ", hash);
    return hash;
  } catch (err) {
    console.error("Erreur de hachage: ", err);
  }
};

// Vérification de mdp
// 21$fg564df56g4d5sfg4d5sfg4dsfg7fdoipgdfgohdf_çè'"ç_(rijherkjher)k -> abdefg => VERIFICATION
export const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPassword, inputPassword);
  } catch (err) {
    console.error("Erreur de vérification: ", err);
    return false;
  }
};
