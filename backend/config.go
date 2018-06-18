package backend

import (
	"os"
	"path/filepath"
	"strings"

	gomENV "github.com/hauxe/gom/environment"
)

const (
	moduleName        = "BotPress"
	defaultRootDomain = "0.0.0.0:8000"
	resourceDir       = "build"
	defaultHost       = "0.0.0.0"
	defaultPort       = 8000
)

// Config server config
type Config struct {
	ModuleName  string
	RootDomain  string `env:"ROOT_DOMAIN"`
	ResourceDir string `env:"RESOURCE_DIRECTORY"`
	Host        string `env:"HOST"`
	Port        int    `env:"PORT"`
}

// LoadConfig load configuration env
func LoadConfig() (*Config, error) {
	dir, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	config := &Config{
		ModuleName:  moduleName,
		RootDomain:  defaultRootDomain,
		ResourceDir: filepath.Join(dir, resourceDir),
		Host:        defaultHost,
		Port:        defaultPort,
	}
	env, err := gomENV.CreateENV(gomENV.SetPrefixOption(strings.ToUpper(moduleName)))
	if err != nil {
		return nil, err
	}
	err = env.Parse(config)
	if err != nil {
		return nil, err
	}
	return config, nil
}
