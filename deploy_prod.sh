path=$1
new_release_dir=$2
current_release_dir="$path/current"
releases_dir="$path/releases"


echo "$new_release_dir"

echo "*Create releases folder if not exist*"
mkdir -p "$releases_dir"

echo "* Activating new release ({{ $new_release_dir }} -> {{ $current_release_dir }}) *"
ln -nsf "$new_release_dir" "$current_release_dir"

echo "* Remove Old Releases *"
find "$releases_dir" -maxdepth 1 -type d -mtime +2 -not -path "$new_release_dir" -not -path "$releases_dir" -exec rm -rf "{}" \;
