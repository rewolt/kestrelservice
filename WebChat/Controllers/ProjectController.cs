using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            var folders = Directory.EnumerateDirectories(Environment.CurrentDirectory + @"\wwwroot");
            return folders.Select(x => x.Substring(x.LastIndexOf("\\")+1)).ToList();
        }
    }
}