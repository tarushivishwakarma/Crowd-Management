$files = Get-ChildItem -Path "c:\Users\Asus\Downloads\Pilgrims Window Web App\src\components\authority" -Filter "*.tsx"
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $n = $c.Replace('text-violet-600', 'text-amber-600')
    $n = $n.Replace('text-violet-800', 'text-amber-800')
    $n = $n.Replace('text-violet-700', 'text-amber-700')
    $n = $n.Replace('bg-violet-100', 'bg-amber-100')
    $n = $n.Replace('bg-violet-50', 'bg-amber-50')
    $n = $n.Replace('border-violet-200', 'border-amber-200')
    $n = $n.Replace('border-violet-500', 'border-amber-500')
    $n = $n.Replace('border-l-violet-500', 'border-l-amber-500')
    $n = $n.Replace('bg-violet-600', 'bg-amber-600')
    $n = $n.Replace('hover:bg-violet-700', 'hover:bg-amber-700')
    $n = $n.Replace('text-purple-600', 'text-orange-600')
    $n = $n.Replace('text-purple-800', 'text-orange-800')
    $n = $n.Replace('bg-purple-100', 'bg-orange-100')
    $n = $n.Replace('bg-purple-50', 'bg-orange-50')
    $n = $n.Replace('font-medium text-violet-600', 'font-medium text-amber-600')
    if ($c -ne $n) {
        [System.IO.File]::WriteAllText($f.FullName, $n)
        Write-Host "Updated: $($f.Name)"
    }
}
