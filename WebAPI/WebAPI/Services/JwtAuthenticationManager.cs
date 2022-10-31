using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        private readonly ApplicationDbContext _context;
        private readonly string key;
        public JwtAuthenticationManager(ApplicationDbContext db)
        {
            this._context = db;
        }
        public string Authenticate(string username, string password)
        {
            
            if (!_context.Users.Any(q=>q.name==username && q.pass == password))
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Name,_context.Users.Where(q=>q.name==username&& q.pass==password).Select(q=>q.id).SingleOrDefault())
                }),
                Expires=DateTime.UtcNow.AddDays(1),
                SigningCredentials=new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string get_id_user_login()
        {
            throw new NotImplementedException();
        }
    }
}
