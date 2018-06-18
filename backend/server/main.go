package main

import (
	"context"

	botpress "github.com/hauxe/botpress/backend"
)

func main() {
	config, err := botpress.LoadConfig()
	if err != nil {
		panic(err)
	}
	routes := botpress.BuildRoutes(config)
	err = botpress.StartService(context.Background(), config, routes)
	if err != nil {
		panic(err)
	}
}
