import { verifyPassword, hashPassword } from '../../utils';

describe('password check', () => {
    const inputPassword = "mdpTest";
    
    it('should hash properly a password', async () => {
        const hashedPassword = await hashPassword(inputPassword);
        expect(hashedPassword).toContain('$argon2id$v=');
    });

    it('should compare a hashed password with a vanilla input', async () => {
        const hashedPassword = await hashPassword(inputPassword);
        const isValid = await verifyPassword(hashedPassword!, inputPassword);
        
        expect(isValid).toBe(true);
    });
});