using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
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
    }
}
