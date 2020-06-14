{
    "targets": [
        {
            "target_name": "motor",
            "sources": ["native/motor.cc"],
            "include_dirs": ["<!(node -e \"require('nan')\")"]
        }
    ]
}
