using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Security
{
    public static class HashHelper
    {

        private static readonly PasswordHasher<string> _hasher = new();

        public static string HashPassword(string password)
        {
            return _hasher.HashPassword(null, password);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            var result = _hasher.VerifyHashedPassword(null, hash, password);
            return result == PasswordVerificationResult.Success;
        }

        //public static string HashPassword(string password)
        //{
        //    using var sha256 = SHA256.Create();
        //    var bytes = Encoding.UTF8.GetBytes(password);
        //    var hash = sha256.ComputeHash(bytes);
        //    return Convert.ToBase64String(hash);
        //}
        //public static bool VerifyPassword(string password,string hash)
        //{
        //    return HashPassword(password) == hash;
        //}
    }
}
