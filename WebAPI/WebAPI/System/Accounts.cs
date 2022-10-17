using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class Accounts
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string? Fullname { get; set; }
        public bool IsAdmin { get; set; }
        public bool Status { get; set; }
        public string Avatar { get; set; }
        public string AddressReceive { get; set; }
        public string Image { get; set; }

    }
}
