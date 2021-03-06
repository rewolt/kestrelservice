﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Kestrel.Controllers;
using Kestrel.Services;
using Serilog;
using Microsoft.Extensions.Configuration;

namespace Kestrel
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public ILogger _logger { get; }
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .MinimumLevel.Information()
                .WriteTo.File(Configuration["LogFileLocation"], rollingInterval: RollingInterval.Day, fileSizeLimitBytes: null, retainedFileCountLimit: 7)
                .CreateLogger();
            
            _logger = Log.Logger;
            _logger.Information("Start kestrel application!");
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseForwardedHeaders(ConfigObjectFactory.MakeForwardedHeadersOptions());
            app.UseWebSockets(ConfigObjectFactory.MakeWebSocketOptions());
            app.UseDefaultFiles();
            app.UseStaticFiles(ConfigObjectFactory.MakeStaticFileOptions(env.IsDevelopment()));
            app.Use(async (context, next) =>
            {
                if (context.Request.Path == "/webchat/ws")
                {
                    await SocketService.HandleRequest(context);
                }
                else
                {
                    await next();
                }
            });
            app.UseMvc();
        }
    }
}
