using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Http;
using System;

namespace WebChat
{
    public static class ConfigObjectFactory
    {
        public static WebSocketOptions MakeWebSocketOptions()
        {
            return new WebSocketOptions()
            {
                KeepAliveInterval = TimeSpan.FromSeconds(120),
                ReceiveBufferSize = 4 * 1024
            };
        }

        public static ForwardedHeadersOptions MakeForwardedHeadersOptions()
        {
            return new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
        }

        public static StaticFileOptions MakeStaticFileOptions(bool isDevelopment)
        {
            var cachePeriod = isDevelopment ? "0" : "86400";
            return new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                }
            };
        }
    }
}
