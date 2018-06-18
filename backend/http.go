package backend

import (
	"context"

	gomHTTP "github.com/hauxe/gom/http"
)

// StartService starts service
func StartService(ctx context.Context, config *Config, routes []gomHTTP.ServerRoute) error {
	server, err := gomHTTP.CreateServer()
	if err != nil {
		return err
	}
	err = server.Start(server.SetHostPortOption(config.Host, config.Port), server.SetHandlerOption(routes...))
	if err != nil {
		return err
	}
	defer server.Stop()
	for {
		select {
		case <-ctx.Done():
			return nil
		}
	}
}
