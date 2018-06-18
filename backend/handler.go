package backend

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

// Page info
type Page struct {
	Title string
	Body  []byte
}

func getIndexHandler(config *Config) http.HandlerFunc {
	tmpl, err := template.ParseFiles(fmt.Sprintf("%s/index.html", config.ResourceDir))
	if err != nil {
		panic(err)
	}
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI)
		tmpl.Execute(w, &Page{
			Title: "Chat Demo",
		})
	}
}
