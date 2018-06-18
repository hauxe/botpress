package backend

import (
	"net/http"

	gomHTTP "github.com/hauxe/gom/http"
)

// BuildRoutes build all routes
func BuildRoutes(config *Config) []gomHTTP.ServerRoute {
	return []gomHTTP.ServerRoute{
		{
			Name:    "static",
			Method:  http.MethodGet,
			Path:    "/public/",
			Handler: http.StripPrefix("/public/", http.FileServer(http.Dir(config.ResourceDir))).ServeHTTP,
		},
		{
			Name:    "index",
			Method:  http.MethodGet,
			Path:    "/",
			Handler: getIndexHandler(config),
		},
	}
}
