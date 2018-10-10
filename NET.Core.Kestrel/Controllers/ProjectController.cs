using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Kestrel.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            var projectsPath = Path.Combine(Environment.CurrentDirectory, "wwwroot");
            var folders = new DirectoryInfo(projectsPath).GetDirectories();
            var names = folders.Select(x => x.Name).ToList();
            return names;
        }
    }
}