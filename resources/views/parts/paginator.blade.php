@if($paginator->hasPages())
    <div class="bottom-nav clr ignore-select" id="bottom-nav">
        <meta name="googlebot" content="noindex">
        <ul class="paginator">
            <span class="paginator__item paginator__prev @if($paginator->currentPage() == 1) hidden @endif">
                <a href="{{ $paginator->previousPageUrl() }}">
                    <span>&laquo;</span>
                </a>
            </span>
            @foreach($elements as $element)
                @if(is_string($element))
                    <li class="paginator__item"><a href="">{{ $element }}</a></li>
                @endif
                @if(is_array($element))
                    @foreach($element as $page => $url)
                        @if($page == $paginator->currentPage())
                            <li class="paginator__item active">
                                <span>{{ $page }}</span>
                            </li>
                        @else
                            <li class="paginator__item">
                                <a href="@if (request("q") != null) {{ $url . "&q=" . request("q") }} @else {{ $url }} @endif">{{ $page }}</a>
                            </li>
                        @endif
                    @endforeach
                    {{--                        <li class="list-inline-item"><a href="">...</a></li>--}}
                @endif
            @endforeach
            <span class="paginator__item paginator__next @if($paginator->currentPage() == $paginator->lastPage()) hidden @endif">
                <a href="@if (request("q") != null) {{ $paginator->nextPageUrl() . "&q=" . request("q") }} @else {{ $paginator->nextPageUrl() }} @endif">
                    <span>&raquo;</span>
                </a>
            </span>
        </ul>
    </div>
@endif
